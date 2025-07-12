/// Module: action
module auction::auction;

use std::string::{String};

use sui::sui::{SUI};
use sui::coin::{Self, Coin};

// Shared Object
public struct Auction has key, store {
  id: UID,
  item: Item,
  bid: Option<Bid>,
}

// Owned Object
public struct Bid has key, store {
  id: UID,
  bidder: address,
  coin: Coin<SUI>
}

public struct Item has key, store {
  id: UID,
}

// Entry Function
entry fun create_item() {
}

entry fun create_auction() {
}

entry fun create_bid() {
}

entry fun bid() {
}
