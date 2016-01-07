// dropdown
$('.dropdown-toggle').dropdown();

// modal
$('#adminUpdateModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)

  var username = button.data('username');
  var email = button.data('email');
  var name = button.data('name');
  var role = button.data('role');
  var id = button.data('id');
  var currentUser = button.data('current');

  var modal = $(this);
  modal.find('.modal-title').text('Update ' + name);
  modal.find('.modal-body input[name="username"]').val(username);
  modal.find('.modal-body input[name="email"]').val(email);
  modal.find('.modal-body input[name="name"]').val(name);
  modal.find('.modal-body input[name="role"]').val(role);
  modal.find('.modal-body form').attr('action', '/admin/update/' + id);
  if (role === 'admin') {
    modal.find('.modal-footer #admin').html('<a class="btn btn-danger" href="/admin/demote/' + id + '">Demote</a>');
  } else {
    modal.find('.modal-footer #admin').html('<a class="btn btn-info" href="/admin/promote/' + id + '">Promote</a>');
  }
  if (id !== currentUser) {
    modal.find('.modal-footer #remove').html('<a class="btn btn-danger" href="/admin/remove/' + id + '">Remove</a>');
  }
});
