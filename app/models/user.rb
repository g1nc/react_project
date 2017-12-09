class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable,
         :rememberable, :trackable

  belongs_to :city

  ROLE_SUPPLIER = 'supplier'.freeze

  validates :email,    presence: true, uniqueness: true
  validates :name,     presence: true
  validates :password, presence: true
  validates :role,     presence: true
end
