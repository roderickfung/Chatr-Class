class Message < ActiveRecord::Base
  
  after_initialize :set_default

  private

  def set_default
    self.flag ||= false
  end

end
