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

Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');


Route.group(() => {

    Route.resource('user', 'AuthController');
    Route.post('/user/register' , 'AuthController.register');


    // Empresa Routes
    Route.resource('empresa', 'EmpresaController').apiOnly();

    // Phones Routes
    Route.resource('phones', 'PhoneController').apiOnly();
    Route.get('phones/find/disponivel', 'PhoneController.findAllDisponivel');

    // Situations Routes
    Route.resource('situations', 'SituationController').apiOnly();

    // Mobile_Email Routes
    Route.resource('mobile_email', 'MobileEmailController').apiOnly();
    Route.get('mobile_email/find/indexByEmailDisponivel' , 'MobileEmailController.indexByEmailDisponivel')

    // Chip Routes
    Route.resource('chip', 'ChipController').apiOnly();
    Route.get('chip/find/indexByDisponivel', 'ChipController.indexByDisponivel');

    // Setor Routes
    Route.resource('setor', 'SetorController').apiOnly();

    // Email Routes
    Route.resource('email', 'EmailController').apiOnly();
    Route.get('email/find/avaiablesEmails' , 'EmailController.indexByEmailDisponivel');

    // Colaborador Routes
    Route.resource('colaborador', 'CollaboratorController').apiOnly();
    Route.get('colaborador/find/city/:id', 'CollaboratorController.indexByCity');

    // Equipaments Routes
    Route.resource('equipaments', 'EquipamentController').apiOnly();
    Route.get('equipaments/find/indexEquipamentAvaiable', 'EquipamentController.indexEquipamentAvaiable');
    Route.get('equipaments/inUse/index', 'EquipamentController.indexEquipamentInUse');


    // Colaborattor_Equipament Routes
    Route.resource('collaborator_equipament', 'CollaboratorEquipamentController').apiOnly();
    Route.get('collaborator_equipament/find/allComodato/:id', 'CollaboratorEquipamentController.indexAllComodatoColaborador');
    Route.get('collaborator_equipament/find/allAlocado', 'CollaboratorEquipamentController.indexEquipamentosAlocados');
    Route.put('collaborator_equipament/devolucao/:id', 'CollaboratorEquipamentController.devolucaoEquipamento');

    // Motivo_Abertura Routes
    Route.resource('motivo_abertura', 'MotivoAberturaController').apiOnly();

    // Ticket_Status Routes
    Route.resource('ticket_status', 'TicketStatusController').apiOnly();

    // Operador Routes
    Route.resource('operador', 'OperadorController').apiOnly();
    Route.get('operador/findall/setor/:id' , 'OperadorController.indexBySetor');
    Route.get('operador/findall/user', 'OperadorController.indexByUser');

    //  ticket Routes
    Route.resource('ticket', 'TicketController').apiOnly();
    Route.get('ticket/allByUser', 'TicketController.showByUser');
    Route.get('ticket/find/allTicket' , 'TicketController.indexTicketByUser');
    Route.get('ticket/find/bySector/:id', 'TicketController.indexTicketBySector');
    Route.get('ticket/find/ticketInfo/:id', 'TicketController.getTicketInfo');
    Route.get('ticket/find/closedTicket', 'TicketController.indexClosedTickets');

    // ticket chat
    Route.resource('chat', 'TicketAtendenteController').apiOnly();
    Route.get('chat/findall/ticket/:id', 'TicketAtendenteController.indexByTicketId');
    
    // Chat controller
    Route.put('chat/updateStatus/ticket' , 'ChatController.changeTicketStatus');
    Route.put('chat/changeTicketSector/ticket','ChatController.changeTicketSector');
    Route.put('chat/initChat/ticket/:id', 'ChatController.initOperatorChat');
    Route.get('chat/CloseChatTicket/ticket/:ticketId', 'ChatController.CloseChatTicket');
    Route.get('chat/indexChatMessages/ticket/:ticketId', 'ChatController.LoadChatMessage');

    // Permissao Routes
    Route.resource('permissao', 'PermissaoController').apiOnly();

    // Cargo Routes
    Route.resource('cargo', 'CargoController').apiOnly();

    // Modelo Routes
    Route.resource('modelo', 'ModeloController').apiOnly();
    Route.get('modelo/findByMarca/:id', 'ModeloController.indexByMarca');
    Route.get('modelo/find/only-equipaments' , 'ModeloController.indexOnlyEquipament');

    // Marca Routes
    Route.resource('marca', 'MarcaController').apiOnly();
  
    // Phone_Equipament Routes -------------------
    Route.resource('phoneColab', 'PhoneColaboradorController').apiOnly();
    Route.get('phoneColab/index/all-phone-in-use', 'PhoneColaboradorController.indexAllPhoneInUse');
    Route.get('phoneColab/find/AllReturnedPhone' , 'PhoneColaboradorController.indexAllPhoneReturned');
    Route.get('phoneColab/find/:colab' , 'PhoneColaboradorController.indexByColaboratorPhones');
    Route.put('phoneColab/devolucao/:colab', 'PhoneColaboradorController.devolucao');   

    // Anexo Routes
    Route.resource('anexo', 'AnexoController').apiOnly();
    Route.get('anexo/download/:anexoId', 'AnexoFileController.downloadFile');
    // Cidade Routes
    Route.resource('cidade', "CidadeController").apiOnly();

    // Anexo fileUpload Routes
    Route.post('anexo/uploadAnexo/anexoFile/:ticketId', 'AnexoFileController.storeFile');

}).middleware('auth');      

Route.get('download/uploads/chatImages/:filename', 'TicketAtendenteController.downloadExcel');
    // upload routes
    



