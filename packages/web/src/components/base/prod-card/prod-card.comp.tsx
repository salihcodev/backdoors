// pkgs:
import { useEffect, useRef, useState, VFC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { FiHeart } from 'react-icons/fi';
import { BiTimeFive } from 'react-icons/bi';
import { BsPaypal } from 'react-icons/bs';
import { GoPackage } from 'react-icons/go';
import { MdOutlineVerified } from 'react-icons/md';

// utils:
import './style.sass';
import { Link } from 'react-router-dom';
import { ProdTypes } from '../../../common/@types/prod.types';
import AppButton from '../../distributed/button/app-button.comp';

// comps:

// component>>>
const ProductCard: VFC<{ prod: ProdTypes }> = ({
  prod: { name, priceInDollar, slug, category, subCategory },
}) => {
  // use preConfigured hooks:
  // const dispatch = useAppDispatch();

  return (
    <div className="card-wrapper">
      <section className="card-head">
        <Link
          to={`/shop/${category}/${subCategory}/${slug}`}
          title={name}
          className="prod-cover"
        ></Link>
        <section className="prod-extra-info">
          <p className="added-by">
            <span className="txt">added by</span>
            <Link to={`/`} className="author">
              <b>ahmad salih</b>
              <span className="img"></span>
            </Link>
          </p>
          <p className="shipping-in">
            <span className="icon">
              <BiTimeFive />
            </span>
            <span className="txt">
              <b>4 days</b> shipping
            </span>
          </p>
          <p className="payment-methods">
            <span className="icon">
              <BsPaypal />
            </span>
            <span className="txt">Paypal / Master Card / Western Union</span>
          </p>
          <p className="warranty">
            <span className="icon">
              <MdOutlineVerified />
            </span>
            <span className="txt">
              <b>2Y</b> Warranty
            </span>
          </p>
          <p className="shipped-as">
            <span className="icon">
              <GoPackage />
            </span>
            <span className="txt">
              shipped as <b>package</b>
            </span>
          </p>
          <section className="prod-actions">
            <AppButton
              loadState={`idle`}
              value="Add to basket"
              type="button"
              wide={false}
              size="sm"
              bkgDefault
              border={{ size: 1 }}
              noBorder={false}
            />
            <AppButton
              loadState={`idle`}
              value={<FiHeart />}
              type="button"
              wide={false}
              size="sm"
              border={{ size: 1 }}
              noBorder
            />
          </section>
        </section>
      </section>
      <section className="prod-basic-info">
        <Link to={`/shop/${category}/${subCategory}/${slug}`} className="name">
          {name}
        </Link>
        <section className="rating">
          <div className="rating-stats">stats in stars</div>
          <small className="total-votes">(total votes)</small>
        </section>
        <h6 className="price">${priceInDollar}/piece</h6>
      </section>
    </div>
  );
};

export default ProductCard;
