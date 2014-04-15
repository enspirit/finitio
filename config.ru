$:.unshift File.expand_path('../website', __FILE__)
require 'app'
run Sinatra::Application
