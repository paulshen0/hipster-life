require 'rubygems'
require 'sinatra'

get '/' do
  @scripts = ['index.js']
  erb :index
end

get '/focus/:date' do
  @scripts = ['focus.js']
  erb :focus
end
