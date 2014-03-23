require 'md_file'
require 'rspec'
require 'path'
(Path.dir.parent/'pages').glob("**/*.md").each do |file|
  describe file.path do

    it 'should have valid data' do
      ->{
        MdFile.new(file).data
      }.should_not raise_error
    end

  end
end