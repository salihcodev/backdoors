// pkgs:
import { useEffect, useState } from 'react';
import { GoPackage } from 'react-icons/go';

// utils:
import './style.sass';
import { MdDone, MdVerifiedUser } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import {
  increaseProdCount,
  decreaseProdCount,
  setProdCount,
} from '../../../../redux/slices/prods-collection/get-single-prod.slice';

// comps:
import AppButton from '../../../distributed/button/app-button.comp';

// component>>>
const ProductOverview: React.VFC<{}> = () => {
  // use preConfigured hooks:
  const dispatch = useAppDispatch();
  const { stage, prod } = useAppSelector((state: RootState) => state.SingleProd);

  const maxAmount = prod?.stock! / 2;

  const [count, setCount] = useState<number | undefined>(prod?.count);
  useEffect(() => {
    dispatch(setProdCount(count));
  }, [count, dispatch]);

  const handleIncrease = () => {
    dispatch(increaseProdCount());
    if (prod?.count && prod?.count < maxAmount) setCount(prod?.count + 1);
  };
  const handleDecrease = () => {
    dispatch(decreaseProdCount());
    if (prod?.count && prod?.count > 1) setCount(prod?.count - 1);
  };

  return (
    <section className="prod-overview">
      <section className="prod-part must-info">
        <div className="flags">
          <div className="ship">{prod?.isReadyToShip ? <span className="value">Ready to ship</span> : null}</div>
          {prod?.stock! >= 10 ? (
            <div className="stock">
              <span className="icon">
                <MdDone />
              </span>
              <span className="value">In Stock</span>
            </div>
          ) : null}
          {prod?.isFastToDispatch ? (
            <div className="dispatch">
              <span className="icon">
                <MdDone />
              </span>
              <span className="value">Fast Dispatch</span>
            </div>
          ) : null}
        </div>
        <h5 className="heading">{prod?.name}</h5>
        {prod?.prodBasicInfo?.model ? <span className="model">({prod?.prodBasicInfo?.model})</span> : null}
      </section>
      <section className="prod-part dozens-offers">
        {prod?.dozensOffers?.map(({ dozensAmount, dozenPrice }): JSX.Element => {
          return (
            <section className="offer">
              <span>{dozensAmount}</span>
              <span>Dozens</span>
              <span>${dozenPrice}</span>
            </section>
          );
        })}
      </section>
      <section className="prod-part colors-and-quantity-controllers">
        <section className="available-colors">
          <div className="flex-wrapper">
            {prod?.availableColors?.map(
              (clr): JSX.Element => (
                <span className="clr" style={{ background: clr }}></span>
              )
            )}
          </div>
        </section>
        <section className="quantity-controllers">
          <span className="fixed-prod-price">${prod?.priceInDollar}</span>
          <button onClick={handleIncrease}>
            <AiOutlinePlus />
          </button>
          <input
            type="number"
            name="quantityController"
            id="quantityController"
            min={prod?.minimumOrder}
            max={maxAmount}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <button onClick={handleDecrease}>
            <AiOutlineMinus />
          </button>
        </section>
      </section>
      <section className="prod-part request-simple">
        <section>
          <span>Simples</span>
        </section>
        <section>
          <p>
            {prod?.priceInDollar}
            <span>/Dozen | 1 Dozen (Min. Order)</span>
          </p>
        </section>
        <section>
          <AppButton
            value="Buy Simple"
            type="button"
            wide
            size="sm"
            border={{ size: 1 }}
            noBorder
            icon={<GoPackage />}
            isIconBefore
            path="/checkout/simple"
            openDetachedly
          />
        </section>
      </section>
      <section className="prod-part protection-cover">
        <section>
          <span>Protection</span>
        </section>
        <section>
          <p>
            <span className="icon">
              <MdVerifiedUser />
            </span>
            <span className="value">Trade Assurance</span>
            <small>protection your fullcart.com order</small>
          </p>
        </section>
      </section>
      <section className="prod-part refunding-policy">
        <p>
          <span className="icon">
            <MdDone />
          </span>
          <span className="value">Refund Policy</span>
        </p>
      </section>
    </section>
  );
};

export default ProductOverview;
