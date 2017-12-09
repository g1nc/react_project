require 'rails_helper'

RSpec.describe Product, type: :model do
  subject { build(:product) }

  context 'validation' do
    %w[name price].each do |key|
      it 'invalid if attr not present' do
        invalid = build(:product, subject.attributes.merge(key => nil))
        expect(invalid).not_to be_valid
      end
    end
  end
end
