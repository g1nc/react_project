require 'rails_helper'

RSpec.describe Quote, type: :model do
  before { 5.times { create(:quote) } }

  subject { Quote }

  describe '#next_id' do
    it 'returns id of next quote' do
      quote = subject.third
      expect(quote.next_id).to eq(subject.fourth.id)
    end
  end

  describe '#previous_id' do
    it 'returns id of previous quote' do
      quote = subject.third
      expect(quote.previous_id).to eq(subject.second.id)
    end
  end
end