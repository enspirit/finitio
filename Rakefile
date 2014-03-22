require './md_file'

desc "Convert .md => .html in reference and pages"
task :md2html do
  (Path.dir/'doc').glob('**/*.md').each do |file|
    MdFile.new(file).html
  end
end

desc "Inspect a md file"
task :toc, :which do |t, args|
  puts MdFile.new(Path.dir/args[:which]).toc.to_yaml
end

desc "Run rspec tests"
task :test do
  system("rspec --color -I. spec/*.rb")
end
task :default => :test
