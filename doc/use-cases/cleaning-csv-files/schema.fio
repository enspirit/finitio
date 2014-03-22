# String is an alias for Ruby's String
String  = .String

# We'll have to coerce Integer literals from ruby String
Integer = <literal> .String \( s | Integer(s) )       \( i | i.to_s    )

# We'll have to coerce Date literals from iso8601 String 
Date = <literal> .String \( s | Date.iso8601(s) )  \( d | d.iso8601 )

# Valid scores are integers between 0 and 10 inclusive
Score = Integer( i | valid: i >= 0 and i <= 10 )

# One CSV row should meet the following tuple type
{
  id:   Integer,
  name: String,
  birthdate: Date,
  score: Score
}
