import { TestBed } from '@angular/core/testing';

import { VoteService } from './vote.service';

describe('VoteServiceService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should start empty', () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service.getItems()).toEqual([]);
  });

  it('should add to the list', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
  });

  it('should be able to undo after adding', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.undo();
    expect(service.getItems()).toEqual([]);
  });

  it('should remove item from list', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.removeItem("Alpha")
    expect(service.getItems()).toEqual([]);
  });

  it('remove item with undo', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.removeItem("Alpha")
    expect(service.getItems()).toEqual([]);
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
  });

  it('increase vote count', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 1 }
    ]);
  });

  it('increase vote count with undo', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 1 }
    ]);
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
  });

  it('decrease vote count', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 1 }
    ]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
  });

  it('decrease vote count with undo', () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 1 }
    ]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 }
    ]);
    service.undo();
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 1 }
    ]);
  });

  // TODO - test removeItem & undo COMPLETE
  // TODO - test removeItem COMPLETE
  // TODO - test upvote COMPLETE
  // TODO - test upvote & undo
  // TODO - test downvote
  // TODO - test downvote & undo
});
