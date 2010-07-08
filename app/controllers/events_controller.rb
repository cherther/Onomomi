class EventsController < ApplicationController

  def create
    @event = Event.new(params[:review])
  
    if @event.save
      redirect_to "/events/show/#{@event.id}"
    end
  end
  
  def destroy
  end
  
  def index
    @events = Event.find(:all)
    
    respond_to do |format|
      format.html # return the default template for HTML
      format.xml { render :xml => @events.to_xml }
      format.json { render :json => @events.to_json }
    end
  end
  
  def new
    @event = Event.new
  end
  
  def show
    @event = Event.find(params[:id])
  end

  
end