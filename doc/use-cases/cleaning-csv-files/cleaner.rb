#!/usr/bin/env ruby
require 'finitio'
require 'csv'

# Let load the schema
schema = Finitio.parse(File.read('schema.fio'))

# For each CSV row
File.open('data.csv', 'r') do |io|
  csv = ::CSV.new io, headers: true
  csv.each do |row|
    tuple = row.to_hash

    # Dress the tuple, on success puts it on STDOUT with coerced
    # values. On error display it with the error message on STDERR
    begin
      puts schema.dress(tuple).inspect
    rescue Finitio::TypeError => ex
      puts "Skipping `#{row.to_s.strip}`: #{ex.message}"
    end

  end
end
