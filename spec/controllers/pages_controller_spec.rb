require 'rails_helper'

RSpec.describe PagesController, type: :controller do
  describe 'GET home' do
    it 'assigns @first_quote_id' do
      quote = create(:quote)
      get :home
      expect(assigns(:first_quote_id)).to eq(quote.id)
    end

    it 'renders the home template' do
      get :home
      expect(response).to render_template(:home)
    end
  end
end