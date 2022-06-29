import { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const QuantityChanger = ({ value,item = [], onChangeQuantity }) => {
  const [quantity, setQuantity] = useState("00");
  const regexp = /^[0-9\b]+$/;

  useEffect(() => {
    console.log(value);
    if (value < 10) {
      const a = "0" + value;
      setQuantity(a);
    } else {
        setQuantity(value.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = (e) => {
    const val = e.target.value;

    if (val && regexp.test(val) && parseInt(val) < 100) {
      if (val < 10) {
        const a = "0" + val;
        setQuantity(a);
        onChangeQuantity({quantity: a , item: item});
      } else {
        setQuantity(e.target.value.toString());
        onChangeQuantity({quantity: val.toString() , item: item});
      }
    }
  };

  const onPlusClick = () => {
    const val = parseInt(quantity);
    const val2 = val + 1;

    if (val2 < 99) {
      if (val2 < 10) {
        const a = "0" + val2;
        setQuantity(a);
        onChangeQuantity({quantity: a , item: item});
      } else {
        setQuantity(val2);
        onChangeQuantity({quantity: val2 , item: item});
      }
    }
  };

  const onMinusClick = () => {
    const val = parseInt(quantity);
    const val2 = val - 1;

    if (val2 > 0) {
      if (val2 < 10) {
        const a = "0" + val2;
        setQuantity(a);
        onChangeQuantity({quantity: a , item: item});
      } else {
        setQuantity(val2);
        onChangeQuantity({quantity: val2 , item: item});
      }
    }
  };
  return (
    <div style={{ width: "85px" }}>
      <InputGroup size="sm">
        <InputGroup.Text className="fw-bold" style={{ cursor: "pointer" }} onClick={onMinusClick}>
          -
        </InputGroup.Text>
        <FormControl type="text" aria-label="Small" value={quantity} onChange={onChangeText} />
        <InputGroup.Text className="fw-bold" style={{ cursor: "pointer" }} onClick={onPlusClick}>
          +
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default QuantityChanger;
