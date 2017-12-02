require 'rails_helper'

RSpec.describe 'show', type: :feature do
  it 'displays quote json' do
    quote = create(:quote)
    visit "/api/quotes/#{quote.id}"
    json = JSON.parse(page.body).symbolize_keys
    %i[id text author].each do |key|
      expect(quote[key]).to eq(json[key])
    end
  end
end