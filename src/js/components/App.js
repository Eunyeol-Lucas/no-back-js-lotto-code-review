import PurchasedLotto from "./PurchasedLotto.js";
import PurchaseAmountInput from "./PurchaseAmountInput.js";
import LottoTicket from "../model/LottoTicket.js";
import WinningNumberInput from "./WinningNumberInput.js";
import ResultModal from "./ResultModal.js";

export default class App {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = {};

    this.purchaseAmountInput = new PurchaseAmountInput({
      createLottoTickets: this.createLottoTickets.bind(this),
    });
  }

  showPurchasedLotto() {
    this.purchasedLotto = new PurchasedLotto({
      lottoTickets: this.lottoTickets,
    });
    this.winningNumberInput = new WinningNumberInput({
      updateWinningNumber: this.updateWinningNumber.bind(this),
      onShowModal: this.onShowModal.bind(this),
    });
    // this.resultModal = new ResultModal({
    //   isVisible: false,
    //   lottoTickets: this.lottoTickets,
    //   winningNumber: this.winningNumber,
    //   onRestart: this.onRestart.bind(this),
    // });
  }

  setState({ lottoTickets, winningNumber }) {
    if (lottoTickets) {
      this.lottoTickets = lottoTickets;
    }
    if (winningNumber) {
      this.winningNumber = winningNumber;
      // this.resultModal.setState({ winningNumber: this.winningNumber });
    }
  }

  createLottoTickets(numOfLotto) {
    this.setState({
      lottoTickets: Array(numOfLotto)
        .fill()
        .map(() => new LottoTicket()),
    });
    this.showPurchasedLotto();
  }

  updateWinningNumber(winningNumber) {
    this.setState({ winningNumber });
  }

  onShowModal() {
    this.resultModal.onShowModal();
  }

  onRestart() {
    this.setState({ lottoTickets: [], winningNumber: {} });
    this.purchaseAmountInput.reset();
  }
}
