require 'md_file'
require 'rspec'
require 'path'
describe MdFile, 'data' do

  let(:md_file){ MdFile.new Path.dir/path }

  subject{ md_file.data }

  context 'without frontmatter' do
    let(:path){ 'without_fm.md' }
    let(:expected){ MdFile::DEFAULT_DATA }

    it{ should eq(expected) }
  end

  context 'with frontmatter' do
    let(:path){ 'with_fm.md' }
    let(:expected){ {"layout" => "twocols"} }

    it{ should eq(expected) }
  end

end