const SlotMachineController = require('../controllers/slotMachine.js');
const { urlsSlotMachine } = require('../utils/urls.js');

module.exports = (app) => {

    app.get(urlsSlotMachine.getCoins, SlotMachineController.getCoins);
    
    app.get(urlsSlotMachine.setCoins, SlotMachineController.setCoins);

    app.get(urlsSlotMachine.sortMachine, SlotMachineController.sortMachine);
    
}
  