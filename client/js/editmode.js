let edit = false;

function addWidgetLocal(widget) {
  if(!widget.id)
    widget.id = Math.random().toString(36).substring(3, 7);
  sendPropertyUpdate(widget.id, widget);
}

function editClick(e) {
  if(edit) {
    const target = widgets.get(e.target.id);
    const { clientX, clientY } = e.type === "touchend" ? e.changedTouches[0] : e;

    if(target.dragStartEvent.clientX == clientX && target.dragStartEvent.clientY == clientY) {
      $('#editWidgetJSON').dataset.id = e.target.id;
      $('#editWidgetJSON').dataset.type = target.p('type');
      $('#editWidgetJSON').value = JSON.stringify(target.state, null, '  ');
      showOverlay('editOverlay');
    }
  }
}

function removeWidgetLocal(widgetID) {
  sendPropertyUpdate(widgetID, null);
}

onLoad(function() {
  on('#editButton', 'click', function() {
    if(edit)
      $('body').classList.remove('edit');
    else
      $('body').classList.add('edit');
    edit = !edit;
    showOverlay();
  });

  on('#addWidget', 'click', function() {
    addWidgetLocal(JSON.parse($('#widgetText').value));
    showOverlay();
  });

  on('#updateWidget', 'click', function() {
    const oldID = $('#editWidgetJSON').dataset.id;
    const oldType = $('#editWidgetJSON').dataset.type;
    const widget = JSON.parse($('#editWidgetJSON').value);
    if(widget.id !== oldID || widget.type !== oldType)
      removeWidgetLocal(oldID);
    addWidgetLocal(widget);
    showOverlay();
  });

  on('#removeWidget', 'click', function() {
    removeWidgetLocal($('#editWidgetJSON').dataset.id);
    showOverlay();
  });

  on('#room', 'mouseup',  editClick);
  on('#room', 'touchend', editClick);
});
