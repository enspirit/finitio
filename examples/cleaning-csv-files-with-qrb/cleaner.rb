#!/usr/bin/env ruby
require 'qrb'
require 'csv'

# Let load the Q schema
schema = Qrb.parse(File.read('schema.q'))

# For each CSV row
File.open('data.csv', 'r') do |io|
  csv = ::CSV.new io, headers: true
  csv.each do |row|
    tuple = row.to_hash

    # Dress the tuple, on success puts it on STDOUT with coerced
    # values. On error display it with the error message on STDERR
    begin
      puts schema.dress(tuple).inspect
    rescue Qrb::TypeError => ex
      puts "Skipping `#{row.to_s.strip}`: #{ex.message}"
    end

  end
end
