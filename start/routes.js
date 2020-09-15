'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

// Route: User
Route.group(() => {
  Route.resource('', 'AuthController')
  Route.post('/register', 'AuthController.register')
  Route.put('/changePassword/:id', 'UserController.changePassword')
  Route.put('/changePermission/:id', 'UserController.changePermission')
  Route.put('/replaceAll/:id', 'UserController.replaceAll')
})
  .prefix('user')
  .middleware('auth')

// Route: Empresa
Route.group(() => {
  Route.resource('', 'EmpresaController').apiOnly()
})
  .prefix('empresa')
  .middleware('auth')

// Route: Phone
Route.group(() => {
  Route.resource('', 'PhoneController').apiOnly()
  Route.get('/find/disponivel', 'PhoneController.findAllDisponivel')
})
  .prefix('phones')
  .middleware('auth')

// Route: Situação
Route.group(() => {
  Route.resource('', 'SituationController').apiOnly()
})
  .prefix('situations')
  .middleware('auth')

// Route: Mobile_email
Route.group(() => {
  Route.resource('', 'MobileEmailController').apiOnly()
  Route.get(
    '/find/indexByEmailDisponivel',
    'MobileEmailController.indexByEmailDisponivel',
  )
})
  .prefix('mobile_email')
  .middleware('auth')

// Route: Chip
Route.group(() => {
  Route.resource('', 'ChipController').apiOnly()
  Route.get('/find/indexByDisponivel', 'ChipController.indexByDisponivel')
})
  .prefix('chip')
  .middleware('auth')

// Route: Setor
Route.group(() => {
  Route.resource('', 'SetorController').apiOnly()
  Route.put('/cargosChange/:id', 'SetorController.updateCargos');
})
  .prefix('setor')
  .middleware('auth')

// Route: Email
Route.group(() => {
  Route.resource('', 'EmailController').apiOnly()
  Route.get('/find/avaiablesEmails', 'EmailController.indexByEmailDisponivel')
})
  .prefix('email')
  .middleware('auth')

// Route: Colaborador
Route.group(() => {
  Route.resource('', 'CollaboratorController').apiOnly()
  Route.get('/find/city/:id', 'CollaboratorController.indexByCity')
})
  .prefix('colaborador')
  .middleware('auth')

// Route: Equipamentos
Route.group(() => {
  Route.resource('', 'EquipamentController').apiOnly()
  Route.get(
    '/find/indexEquipamentAvaiable',
    'EquipamentController.indexEquipamentAvaiable',
  )
  Route.get('/inUse/index', 'EquipamentController.indexEquipamentInUse')
})
  .prefix('equipaments')
  .middleware('auth')

// Route: Colaborador Equipamento
Route.group(() => {
  Route.resource('', 'CollaboratorEquipamentController').apiOnly()
  Route.get(
    '/find/allComodato/:id',
    'CollaboratorEquipamentController.indexAllComodatoColaborador',
  )
  Route.get(
    '/find/allAlocado',
    'CollaboratorEquipamentController.indexEquipamentosAlocados',
  )
  Route.put(
    '/devolucao/:id',
    'CollaboratorEquipamentController.devolucaoEquipamento',
  )
})
  .prefix('collaborator_equipament')
  .middleware('auth')

// Route: Motivo Abertura
Route.group(() => {
  Route.resource('', 'MotivoAberturaController').apiOnly()
})
  .prefix('motivo_abertura')
  .middleware('auth')

// Route: Ticket Status
Route.group(() => {
  Route.resource('', 'TicketStatusController').apiOnly()
})
  .prefix('ticket_status')
  .middleware('auth')

// Route: Operador
Route.group(() => {
  Route.resource('', 'OperadorController').apiOnly()
  Route.get('/findall/setor/:id', 'OperadorController.indexBySetor')
  Route.get('/findall/user', 'OperadorController.indexByUser')
})
  .prefix('operador')
  .middleware('auth')

// Route: Ticket
Route.group(() => {
  Route.resource('', 'TicketController').apiOnly()
  Route.get('/allByUser', 'TicketController.showByUser')
  Route.get('/find/allTicket', 'TicketController.indexTicketByUser')
  Route.get('/find/bySector/:id', 'TicketController.indexTicketBySector')
  Route.get('/find/ticketInfo/:id', 'TicketController.getTicketInfo')
  Route.get('/find/closedTicket', 'TicketController.indexClosedTickets')
  Route.post('find/advancedIndex', 'TicketController.advancedIndex')
  Route.post('/count/ticketsInSetors', 'TicketController.countNewTickets')
})
  .prefix('ticket')
  .middleware('auth')

// Route: Chat
Route.group(() => {
  Route.resource('', 'TicketAtendenteController').apiOnly()
  Route.get('/findall/ticket/:id', 'TicketAtendenteController.indexByTicketId')
  Route.put('/updateStatus/ticket', 'ChatController.changeTicketStatus')
  Route.put('/changeTicketSector/ticket', 'ChatController.changeTicketSector')
  Route.put('/initChat/ticket/:id', 'ChatController.initOperatorChat')
  Route.get(
    '/CloseChatTicket/ticket/:ticketId',
    'ChatController.CloseChatTicket',
  )
  Route.get(
    '/indexChatMessages/ticket/:ticketId',
    'ChatController.LoadChatMessage',
  )
})
  .prefix('chat')
  .middleware('auth')

// Route: Cargo
Route.group(() => {
  Route.resource('', 'CargoController').apiOnly()
})
  .prefix('cargo')
  .middleware('auth')

// Route: Modelo
Route.group(() => {
  Route.resource('', 'ModeloController').apiOnly()
  Route.get('/findByMarca/:id', 'ModeloController.indexByMarca')
  Route.get('/findByMarca/exclusive/:id', 'ModeloController.indexByMarcaExclusive')
  Route.get('/find/only-equipaments', 'ModeloController.indexOnlyEquipament')
})
  .prefix('modelo')
  .middleware('auth')

// Route: Marca
Route.group(() => {
  Route.resource('', 'MarcaController').apiOnly()
})
  .prefix('marca')
  .middleware('auth')

// Route: Phone Colaborador
Route.group(() => {
  Route.resource('', 'PhoneColaboradorController').apiOnly()
  Route.get(
    '/index/all-phone-in-use',
    'PhoneColaboradorController.indexAllPhoneInUse',
  )
  Route.get('/filter/historic', 'PhoneColaboradorController.indexWithFilter')
  Route.get(
    '/find/AllReturnedPhone',
    'PhoneColaboradorController.indexAllPhoneReturned',
  )
  Route.get(
    '/find/:colab',
    'PhoneColaboradorController.indexByColaboratorPhones',
  )
  Route.put(
    '/devolucao/:colab',
    'PhoneColaboradorController.devolucao',
  )
})
  .prefix('phoneColab')
  .middleware('auth')

// Route: Cidade
Route.group(() => {
  Route.resource('', 'CidadeController').apiOnly()
})
  .prefix('cidade')
  .middleware('auth')

// Route: Anexos
Route.group(() => {
  Route.resource('', 'AnexoController').apiOnly()
  Route.get('/download/:anexoId', 'AnexoFileController.downloadFile')
  Route.post(
    '/uploadAnexo/anexoFile/:ticketId',
    'AnexoFileController.storeFile',
  )
})
  .prefix('anexo')
  .middleware('auth')

// Route: Ticket Manager
Route.group(() => {
  Route.put('/:id', 'TicketManagerController.TicketSectorChange')
  Route.get('/leaveTicket/:id', 'TicketManagerController.leaveTicket')
})
  .prefix('ticket_manager')
  .middleware('auth')

Route.group(() => {
  Route.resource('', 'NotificationController')
  Route.get(
    '/search/:user_id',
    'NotificationSearchController.searchNotificationByUser',
  )
  Route.get(
    '/disableNotification/:notificationId',
    'NotificationController.disableNotification',
  )
  Route.delete('/deleteAll/:userId', 'NotificationController.destroyAll')
})
  .prefix('notification')
  .middleware('auth')

// Permissao Routes
Route.group(() => {
  Route.resource('', 'PermissaoController').apiOnly()
})
  .prefix('permissao')
  .middleware('auth')

Route.get(
  'download/uploads/chatImages/:filename',
  'TicketAtendenteController.downloadExcel',
)
// upload routes
