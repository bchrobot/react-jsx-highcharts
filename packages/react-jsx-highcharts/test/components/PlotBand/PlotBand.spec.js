import React from 'react';
import PlotBand from '../../../src/components/PlotBand/PlotBand';
import { createMockAxis } from '../../test-utils';

describe('<PlotBand />', function ()  {
  beforeEach(function () {
    this.addPlotBand = sinon.spy();
    this.removePlotBand = sinon.spy();
  });

  describe('when mounted', function () {
    it('adds a title using the Axis addPlotBand method', function () {
      mount(<PlotBand id="My PlotBand" from={1} to={2} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand} />);
      expect(this.addPlotBand).to.have.been.calledWith(
        { id: 'My PlotBand', from: 1, to: 2, addPlotBand: this.addPlotBand, removePlotBand: this.removePlotBand }
      );
    });

    it('should pass additional props through to Axis addPlotBand method', function () {
      mount(<PlotBand borderColor="red" id="My Other PlotBand" from={8.8} to={24.2} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand} />);
      expect(this.addPlotBand).to.have.been.calledWith(
        { id: 'My Other PlotBand', borderColor: 'red', from: 8.8, to: 24.2, addPlotBand: this.addPlotBand, removePlotBand: this.removePlotBand }
      );
    });
  });

  describe('when unmounted', function () {
    it('removes the plot band by id (if the parent axis still exists)', function () {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand} getAxis={createMockAxis} />
      );
      this.removePlotBand.reset();
      wrapper.unmount();
      expect(this.removePlotBand).to.have.been.calledWith('My PlotBand');
    });

    it('does nothing if the axis has already been removed', function () {
      const wrapper = mount(
        <PlotBand id="My PlotBand" from={1} to={2} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand} getAxis={() => undefined} />
      );
      this.removePlotBand.reset();
      wrapper.unmount();
      expect(this.removePlotBand).not.to.have.been.called;
    });
  });

  describe('children', function () {
    it('should pass the ID of the plot band to the children', function () {
      const ChildComponent = props => (<div />);

      const wrapper = mount(
        <PlotBand id="myId" from={10} to={20} addPlotBand={this.addPlotBand} removePlotBand={this.removePlotBand}>
          <ChildComponent />
        </PlotBand>
      );
      expect(wrapper.find(ChildComponent).props()).to.eql(
        { id: 'myId', from: 10, to: 20, addPlotBand: this.addPlotBand, removePlotBand: this.removePlotBand }
      );
    });
  });
});
