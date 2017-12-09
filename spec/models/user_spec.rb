require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  context 'validation' do
    %w[email name password role].each do |key|
      it 'invalid if attr not present' do
        invalid = build(:user, subject.attributes.merge(key => nil))
        expect(invalid).not_to be_valid
      end
    end
  end
end
