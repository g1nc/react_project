class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  belongs_to :product

  validates :sender,   presence: true
  validates :receiver, presence: true
  validates :status,   presence: true
  validates :code,     uniqueness: true

  STATUS_WAITING = 'waiting'.freeze

  before_validation :generate_code

  private

  def generate_code
    return if code.present?
    loop do
      self.code = SecureRandom.hex(3)
      break unless Order.exists?(code: code)
    end
  end
end
