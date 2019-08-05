const list = document.querySelector("#list");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(`https://acme-users-api-rev.herokuapp.com/api/${this.props.endpoint}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },

        // handle errors
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return React.createElement("div", {}, error.message);
    } else if (!isLoaded) {
      return React.createElement("div", {}, "is Loading");
    } else {
      const lis = items.map(item =>
        React.createElement("li", { key: item.id }, item.name)
      );
      window.localStorage.setItem(`${this.props.endpoint}_count`, items.length);

      return React.createElement("ul", { className: this.props.endpoint }, lis);
    }
  }
}

//create and display list of products & companies
const products = React.createElement(App, { endpoint: "products" });
const companies = React.createElement(App, { endpoint: "companies" });
const listData = React.createElement("div", null, products, companies);

ReactDOM.render(listData, list);

//create and display number of products & companies on the top of the screen
const head = document.querySelector("#count");
const count = `Acme - we have ${window.localStorage.getItem(
  "products_count"
)} products and ${window.localStorage.getItem("companies_count")} companies`;

ReactDOM.render(React.createElement("div", null, count), head);
