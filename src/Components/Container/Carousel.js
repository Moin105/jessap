export default class NextJsCarousel extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        data: null,
      };
    }
    componentDidMount() {
    //   fetch("https://globaltechnologia.org/webAdmin/api/testomshow")
    //     .then((response) => response.json())
    //     .then((data) => this.setState({ data }));
      console.log("SSS", this.state);
    }
  
    render() {
      const { data } = this.state;
  
      console.log("data", data);
  
      const arrowStyles = {
        position: "absolute",
        top: "0",
        bottom: "auto",
        padding: ".4em",
        margin:"auto 0 !important" ,
        zIndex: 2,
        width: "55px",
        height: "100%",
      };
      return (
        <div>
          <Carousel
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="arrow"
                  style={{
                    ...arrowStyles,
                    left: "0",
                    backgroundColor: "transparent",
                    border: "none",
                    margin: "auto 0px ",
                  }}
                >
                  {" "}
                  <Image src={prev} alt="quote" width={52} height={52} smooth />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  className="arrow"
                  onClick={onClickHandler}
                  title={label}
                  style={{
                    ...arrowStyles,
                    right: 0,
                    background: "transparent",
                    border: "none",
                    margin: "auto 0px ",
                  }}
                >
                  {" "}
                  <Image src={next} alt="quote" width={52} height={52} />
                </button>
              )
            }
            showStatus={false}
            showThumbs={false}
            // autoPlay={true}
            style={{ ...arrowStyles, left: 15 }}
          >
            {data?.map((child, index) => {
              return (
                <Testimonials
                  review={child.discription}
                  cname={child.company}
                  key={index}
                />
              );
            })}
          </Carousel>
        </div>
      );
    }
  }