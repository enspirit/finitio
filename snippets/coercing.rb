require 'qrb'
require 'time'
require 'json'

Kernel.const_get('DateTime')

data = <<-JSON
[
  {
    "where": "Brussels",
    "at": "2014-03-01",
    "temperature": 13.5
  },
  {
    "where": "Paris",
    "at": "2014-02-27",
    "temperature": 12.0
  }
]
JSON

class Measure
  def initialize(where, at, temperature)
    @where, @at, @temperature = where, at, temperature
  end
  def self.info(tuple)
    Measure.new(tuple[:where], tuple[:at], tuple[:temperature])
  end
end

schema = <<-Q
Measure = .Measure <info> {
  where: String,
  at: Date,
  temperature: Float( f | f >= -40.0 and f <= 50.0 )
}
[Measure]
Q

puts Qrb::DEFAULT_SYSTEM.parse(schema).dress(::JSON.parse(data)).inspect