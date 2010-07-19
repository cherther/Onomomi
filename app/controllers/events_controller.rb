class EventsController < ApplicationController

  #skip_before_filter :verify_authenticity_token, :only => [:openid]
  before_filter :login_required, :only=>['create', 'new']

  def create
    @event = Event.new(params[:event])
  
    if @event.save
      redirect_to '/' #/show/#{@event.id}"
    end
  end
  
  def destroy
  end
  
  def index
    type = params['id']
    if type != nil
      @events = Event.find(:all, :conditions => 'event_type_id = ' + type )
    else
      @events = Event.find(:all)
    end
    respond_to do |format|
      format.html # return the default template for HTML
      format.xml { render :xml => @events.to_xml }
      format.json { render :json => @events.to_json }
    end
  end
  
  def new
    @distances = DistanceCategory.find(:all)
    @event_types = EventType.find(:all)
    @event = Event.new
  end
  
  def show
    @event = Event.find(params[:id])
  end

  
end