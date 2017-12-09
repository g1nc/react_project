require 'rails_helper'

RSpec.describe Order, type: :model do
  subject { build(:order) }

  context 'validation' do
    %w[user_id product_id address_id sender receiver status].each do |key|
      it 'invalid if attr not present' do
        invalid = build(:order, subject.attributes.merge(key => nil))
        expect(invalid).not_to be_valid
      end
    end

    it 'invalid if code duplicate' do
      create(:order, code: 'test_code')
      expect(build(:order, code: 'test_code')).not_to be_valid
    end
  end

  describe '#generate_code' do
    it 'generate code if code nil' do
      expect(SecureRandom).to receive(:hex).and_return('000000')
      expect(Order).to receive(:exists?).and_return(false)
      subject.update(code: nil)
      expect(subject.id).not_to be_nil
      expect(subject.code).to eq('000000')
    end

    it 'do not generate code if code present' do
      code = subject.code
      subject.save
      expect(subject.id).not_to be_nil
      expect(subject.code).to eq(code)
    end
  end
end
