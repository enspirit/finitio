require 'json'
require 'yaml'
require 'path'
class MdFile

  DEFAULT_DATA = {
    "layout" => "onecol"
  }.freeze

  FRONT_MATTER = /^(---\s*\n.*?\n?)^(---\s*$\n?)/m

  ANCHOR_RX = %r{
    <h(\d)>\s+
      <a \s+ name=".*?" \s+ class="anchor" \s+ href="(.*?)" \s*>
        .*?
      </a> \s*
      (.*?)
    </h\d>
  }xi

  def initialize(source)
    @source = source
  end
  attr_reader :source

  def ok?
    md_file.exists? || html_file.exists?
  end

  def raw
    @raw ||= source.exists? ? source.read : ""
  end

  def data
    @data ||= (raw =~ FRONT_MATTER) ? YAML::load($1) : DEFAULT_DATA
  end

  def full_data
    { "toc" => toc }.merge(data)
  end

  def md_file
    source.sub_ext(".md")
  end

  def md
    @md ||= (raw =~ FRONT_MATTER) ? $' : raw
  end

  def html_file
    source.sub_ext(".html")
  end

  def toc
    @toc ||= html.scan(ANCHOR_RX).map{|match|
      { "level" => match[0], "href" => match[1], "label" => match[2] }
    }
  end

  def html
    if html_file.exists?
      html_file.read
    else
      MdFile.md2html(md).tap{|doc|
        html_file.write(doc)
      }
    end
  end

  def inspect
<<-EOF
#{full_data.to_yaml}
---
#{md}
EOF
  end

public

  def self.md2html(source)
    require 'rest_client'
    data = {
      "text" => source.gsub(/\`\`\`finitio/, '```ruby'),
      "mode" => "markdown",
      "context" => "blambeau/finitio"
    }
    RestClient.post "https://api.github.com/markdown",
      data.to_json,
      content_type: "application/vnd.github.beta+json",
      accept: "application/vnd.github.beta+json"
  end

end # class MdFile
