import React from 'react';
import {func} from 'prop-types';
import {tree} from '../types';


const Tree = ({tree, onShowModal, onShowEditModal, onReset}) => (
  <div>
    <button className="root button reset" onClick={onReset}>Reset System</button>
    <ul className="listContainer">
      <button className="root button" onClick={onShowModal}>Root</button>
      {tree.root.children.map((child) =>
        <li className=''
            key={child.id}>
          <span onClick={() => onShowEditModal(child.id)}>{child.name}</span>
          <div className="nodebounds">{`${child.lowerbound} - ${child.upperbound}`}</div>
          <ul>
            {child.randomChildren.map((randomChild) =>
              <li className='randomChildren'
                  key={randomChild}>
                {randomChild}
              </li>
            )}</ul>
        </li>)}</ul>
  </div>
);

Tree.propTypes = {
  tree: tree.isRequired,
  onShowModal: func.isRequired,
  onShowEditModal: func.isRequired,
  onReset: func.isRequired
};

export default Tree;


