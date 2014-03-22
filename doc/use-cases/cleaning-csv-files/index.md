# Cleaning .csv files the easy way using Finitio(-rb)

As a database and software consultant I frequently face the requirement of
cleaning and migrating legacy data to a new database structure. Such data
often comes from excel or as CSV files extracted from a previous database.
An invariant is that legacy data is noisy and must alway be cleaned first.

So suppose a CSV file, with noisy data (missing required fields, wrong dates,
etc.). Your job is to split that CSV file: valid records on STDOUT, invalid
ones on STDERR with an explanation.

## The data

```csv
id,name,birthdate,score
1,Aaron,2013-10-28,5
2,Courtney,2013-26-08,5
3,Connor,2014-10-11,8
4,Meredith,2014-10-15,22
5,Kristen,2014-03-28,8
6,Nissim,2014-06-05,
...
```

Given that,

* Some dates are known to be wrong. It was a text field and some people
  inverted the month and the day, leading to dates such as `2013-26-08`
  instead of `2013-08-26` (see row 2).
* The `score` field is required and supposed to be between 0 and 10. In
  practice it is sometimes missing or bigger than 10 (see rows 4 and 6).

## Finition schema at the rescue

Let write a schema that will coerce the data and detect invalid values.

```ruby
# String is an alias for Ruby's String
String  = .String

# We'll have to coerce Integer literals from ruby String
Integer = <literal> .String \( s | Integer(s) )       \( i | i.to_s    )

# We'll have to coerce Date literals from iso8601 String 
Date    = <literal> .String \( s | Date.iso8601(s) )  \( d | d.iso8601 )

# Valid scores are integers between 0 and 10 inclusive
Score = Integer( i | valid: i >= 0 and i <= 10 )

# One CSV row should meet the following tuple type
{
  id:   Integer,
  name: String,
  birthdate: Date,
  score: Score
}
```

## Making the split using Finitio(-rb)

Here we go! Dress each CSV line using the schema, rescue on a type error:

```ruby
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
```

Example output:

```
{:id=>1, :name=>"Aaron", :birthdate=>#<Date: 2013-10-28 ((2456594j,0s,0n),+0s,2299161j)>, :score=>5}
Skipping `2,Courtney,2013-26-08,5`: Invalid value `2013-26-08` for Date
{:id=>3, :name=>"Connor", :birthdate=>#<Date: 2014-10-11 ((2456942j,0s,0n),+0s,2299161j)>, :score=>8}
Skipping `4,Meredith,2014-10-15,22`: Invalid value `22` for Score (not valid)
{:id=>5, :name=>"Kristen", :birthdate=>#<Date: 2014-03-28 ((2456745j,0s,0n),+0s,2299161j)>, :score=>8}
Skipping `6,Nissim,2014-06-05,`: Invalid value `nil` for Score
{:id=>7, :name=>"Donna", :birthdate=>#<Date: 2013-03-29 ((2456381j,0s,0n),+0s,2299161j)>, :score=>2}
{:id=>8, :name=>"Jenette", :birthdate=>#<Date: 2014-04-04 ((2456752j,0s,0n),+0s,2299161j)>, :score=>2}
{:id=>9, :name=>"Mason", :birthdate=>#<Date: 2014-08-05 ((2456875j,0s,0n),+0s,2299161j)>, :score=>8}
Skipping `10,Yolanda,2014-03-25,77`: Invalid value `77` for Score (not valid)
{:id=>11, :name=>"Edan", :birthdate=>#<Date: 2015-02-18 ((2457072j,0s,0n),+0s,2299161j)>, :score=>8}
```
