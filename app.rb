require './md_file'
require 'path'
require 'sinatra'
require 'wlang'
require "sinatra/reloader" if development?

CURRENT_VER = "0.3.0"
ROOT        = Path.dir
DOC         = ROOT/"doc"

set :cache, {}

configure do
  set :views, 'views'
  set :wlang, layout: "html5".to_sym
end

### Internal redirects

get '/' do
  call(env.merge("PATH_INFO" => "/home"))
end

get '/reference' do
  call(env.merge("PATH_INFO" => "/reference/#{CURRENT_VER}"))
end

### Pages

def md_file(base, url)
  source = base/url
  source = source/'index.md' if source.directory?
  source = MdFile.new(source)
  if source.ok?
    data = source.data
    data = data.merge({
      "text"    => source.html,
      "current" => url[/^([^\/]+)/, 1] || 'home'
    })
    wlang data['layout'].to_sym, locals: data
  else
    not_found
  end
end

get '/*' do |url|
  md_file DOC, url
end
