require 'path'
require 'sinatra'
require 'wlang'

configure do
  set :views, 'views'
  set :wlang, layout: "html5".to_sym
end

get '/' do
  intro = (Path.dir/'pages/intro.html').read
  wlang :index, locals: {intro: intro}
end