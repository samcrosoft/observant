class Tout extends Observant
  Tout.SHOUT_EVENT = "shout_event"

  constructor:() ->
    @iShout = 0
    super()
    return

  shoutOut: () ->
    @iShout += 1
    @notify Tout.SHOUT_EVENT, "shouting - #{@iShout} time(s)"
    return






#----------------------------------
# run the test class and bind it to jquery ready
#----------------------------------


$(document).ready(()->
  window.oToutPerson = new Tout()

  $("#shoutOut").on 'click', () ->
    oToutPerson.shoutOut()
    return

  oToutPerson.observe Tout.SHOUT_EVENT, (sMessage) ->
    $("ol#listMessage").append "<li>#{sMessage}</li>"
    return
  return

)