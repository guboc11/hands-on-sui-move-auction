/// Module: action
module auction::auction;

use std::string::{String};

use sui::sui::{SUI};
use sui::coin::{Coin};

// Shared Object
public struct Auction<T: key + store> has key, store {
  id: UID,
  description: String,
  expire_timestamp: u64,
  min_price: u64,
  highest_bid_price: u64,
  item: Option<T>,
  bid: Option<Bid>,
  is_open: bool
}

// Owned Object
public struct Bid has key, store {
  id: UID,
  auction_id: ID,
  item_id: ID,
  bidder: address,
  coin: Coin<SUI>
}

// Entry Function
entry fun create_auction(ctx: &mut TxContext) {

}

entry fun bid(ctx: &mut TxContext) {

}

// Public Function
public fun new_auction(): Auction {

}

public fun new_bid(): Bid {

}

public fun place_item_to_auction<T: key+store>(item: T) {

}