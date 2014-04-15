ENV['RACK_ENV'] = 'test'

require 'app'
require 'rspec'
require 'rack/test'

module Helpers

  def app
    Sinatra::Application
  end

end

RSpec.configure do |c|
  c.include Helpers
end

########################################################################## doc

[
  '/',
  '/home',
  '/use-cases',
  '/use-cases/cleaning-csv-files',
  '/reference/0.1.x/type-system'
].each do |url|

  describe "get #{url}" do
    include Rack::Test::Methods

    it "works" do
      get url
      expect(last_response).to be_ok
    end
  end

end

###################################################################### unhappy

describe 'get /reference/0.1.x/foo' do
  include Rack::Test::Methods

  it "works" do
    get '/reference/../pages/intro'
    expect(last_response).not_to be_ok
    expect(last_response.status).to eq(404)
  end
end

describe 'get /reference/../pages/intro' do
  include Rack::Test::Methods

  it "works" do
    get '/reference/../pages/intro'
    expect(last_response).not_to be_ok
  end
end
