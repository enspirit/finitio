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

describe 'get /reference/0.3.x/{path}' do
  include Rack::Test::Methods

  it "works" do
    get '/reference/0.3.x/type-system'
    expect(last_response).to be_ok
  end
end

describe 'get /reference/latest/{path}' do
  include Rack::Test::Methods

  it "works" do
    get '/reference/latest/type-system'
    expect(last_response.status).to eq(302)
    expect(last_response.headers['Location']).to match(%r{/reference/#{CURRENT_VER}/type-system$})
  end
end

###################################################################### unhappy

describe 'get /reference/../pages/intro' do
  include Rack::Test::Methods

  it "works" do
    get '/reference/../pages/intro'
    expect(last_response).not_to be_ok
    expect(last_response.status).to eq(404)
  end
end
