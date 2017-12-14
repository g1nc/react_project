class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable

  belongs_to :city
  has_many :orders

  ROLE_SUPPLIER = 'supplier'.freeze
  ROLE_ADMIN = 'admin'.freeze

  validates :email,    presence: true, uniqueness: true
  validates :name,     presence: true
  validates :password, presence: true
  validates :role,     presence: true

  def admin?
    role == ROLE_ADMIN
  end
end
