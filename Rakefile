desc "Use github markdown API to convert .md => .html"
task :snippets do
  require 'rest_client'
  require 'path'
  (Path.dir/'snippets').glob('**/*.md') do |page|
    target = page.sub_ext('.html')
    next if target.exists?
    data = {
      "text" => page.read,
      "mode" => "markdown",
      "context" => "blambeau/finitio"
    }
    res = RestClient.post "https://api.github.com/markdown",
                          data.to_json,
                          content_type: "application/vnd.github.beta+json",
                          accept: "application/vnd.github.beta+json"
    target.write(res.to_s)
  end
end