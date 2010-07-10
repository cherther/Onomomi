class HomeController < ApplicationController
  def index
  end
  def type
    redirect_to :action => 'index', :id => params[:id]
  end
end