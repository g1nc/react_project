require 'rails_helper'

RSpec.describe Address, type: :model do
  subject { build(:address) }

  context 'validation' do
    %w[user_id value].each do |key|
      it 'invalid if attr not present' do
        invalid = build(:address, subject.attributes.merge(key => nil))
        expect(invalid).not_to be_valid
      end
    end
  end
end
