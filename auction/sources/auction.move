/// Module: action
module auction::auction;

use sui::sui::{SUI};
use sui::coin::{Self, Coin};
use sui::event;


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
/// =======================
/// 이벤트 Structs
/// =======================

public struct AuctionCreatedEvent has copy, drop {
    auction_id: ID,
    item_id: ID,
}

// Entry Function
entry fun create_item(ctx: &mut TxContext) {
  let item = Item {
    id: object::new(ctx)
  };
  transfer::transfer(item, ctx.sender());
}

entry fun create_auction(item: Item, ctx: &mut TxContext) {
  let auction = Auction {
    id: object::new(ctx),
    item,
    bid: option::none()
  };
  event::emit(AuctionCreatedEvent {
    auction_id: object::id(&auction),
    item_id: object::id(&auction.item),
  });
  transfer::share_object(auction);
}

entry fun create_bid(ctx: &mut TxContext) {
  let bid = Bid {
    id: object::new(ctx),
    bidder: ctx.sender(),
    coin: coin::zero(ctx),
  };
  transfer::transfer(bid, ctx.sender());
}

entry fun bid(auction: &mut Auction, bid: Bid) {
  if (auction.bid.is_some()) {
    let old_bid = auction.bid.swap(bid);
    let recipient = old_bid.bidder;
    transfer::public_transfer(old_bid, recipient);
  } else {
    auction.bid.fill(bid);
  };
}
