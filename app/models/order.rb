class Order < ApplicationRecord
  belongs_to :user
  belongs_to :address
  belongs_to :product

  validates :sender,   presence: true
  validates :receiver, presence: true
  validates :status,   presence: true
  validates :code,     uniqueness: true

  STATUS_WAITING = 'waiting'.freeze
  STATUS_DONE    = 'done'.freeze
  STATUS_OVERDUE = 'overdue'.freeze

  before_validation :generate_code

  def status_hash
    case status
    when STATUS_WAITING
      { name: 'В ожидании', class: 'info' }
    when STATUS_DONE
      { name: 'Исполнено',  class: 'success' }
    when STATUS_OVERDUE
      { name: 'Просрочено', class: 'danger' }
    end
  end

  private

  def generate_code
    return if code.present?
    loop do
      self.code = SecureRandom.hex(3)
      break unless Order.exists?(code: code)
    end
  end
end
