require 'rails_helper'

RSpec.describe City, type: :model do
  subject { build(:city) }

  context 'validation' do
    %w[name].each do |key|
      it 'invalid if attr not present' do
        invalid = build(:city, subject.attributes.merge(key => nil))
        expect(invalid).not_to be_valid
      end
    end
  end
end
