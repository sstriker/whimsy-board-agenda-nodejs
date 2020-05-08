import Agenda from "../models/agenda.js";
import Colorize from "../elements/colorize.js";
import Minutes from "../models/minutes.js";
import React from "react";
import User from "../models/user.js";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    agenda: state.agenda,
  }
};

// Layout footer consisting of a previous link, any number of buttons,
// followed by a next link.
//
// Overrides previous and next links when traversal is queue, shepherd, or
// Flagged.  Injects the flagged items into the flow on the meeting day
// (last executive officer <-> first flagged/unapproved/missing &&
//  last flagged/unapproved/missing <-> first Special order)
//
class Footer extends React.Component {
  render() {
    let item = this.props.item || this.props;
    let { traversal } = this.props;

    return <Colorize item={item}>
      <footer className="fixed-bottom navbar">
        <PrevLink item={item} agenda={this.props.agenda} traversal={traversal} />

        <span>{this.props.buttons ? this.props.buttons.map((button) => {
          let props;

          if (button.text) {
            props = { ...button.attrs, key: button.text };

            if (button.attrs.class) {
              props.className = button.attrs.class.split(" ");
              delete props.class;
            };

            return React.createElement("button", props, button.text)
          } else if (button.type) {
            return React.createElement(button.type, { ...button.attrs, key: button.type.name })
          }

          return null
        }) : null}</span>

        <NextLink item={item} agenda={this.props.agenda} traversal={traversal} />
      </footer>
    </Colorize>
  }
};

/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/anchor-has-content */

class PrevLink extends React.Component {
  render() {
    let { agenda, item, traversal } = this.props;

    let link = item?.prev;
    if (link && !link.title) link = agenda[link];
    let prefix = "";
    let meetingDay = Minutes.started || Agenda.meeting_day;

    if (traversal === "queue") {
      prefix = "/queue";

      while (link && !link.ready_for_review(User.initials)) {
        link = agenda[link.prev]
      };

      link = link || { href: "/queue", title: "Queue" }
    } else if (traversal === "shepherd") {
      prefix = "/shepherd/queue";

      while (link && link.shepherd !== item.shepherd) {
        link = agenda[link.prev]
      };

      link = link || {
        href: `/${item.shepherd}`,
        title: "Shepherd"
      }
    } else if (traversal === "flagged") {
      prefix = "/flagged";

      while (link && link.skippable) {
        if (/^\d[A-Z]/m.test(link.attach)) {
          prefix = "";
          break
        } else {
          link = agenda[link.prev]
        }
      };

      if (!link) {
        if (meetingDay) {
          link = Agenda.index.find(item => item.next && /^\d+$/m.test(item.next.attach));
          prefix = ""
        };

        link = link || { href: "flagged", title: "Flagged" }
      }
    } else if (meetingDay && /\d/.test(item.attach) && link && /^[A-Z]/m.test(link.attach)) {
      for (let item in agenda) {
        if (!item.skippable && /^([A-Z]|\d+$)/m.test(item.attach)) {
          prefix = "/flagged";
          link = item
        }
      }
    };

    if (link) {
      if (!/^([A-Z]|\d+$)/m.test(link.attach)) prefix = "";
      
      return <Colorize item={link}>
        {(!prefix && link.href.startsWith('../'))
          ? <a className={"navbar-brand backlink"} rel="prev" href={link.href}>{link.title}</a>
          : <Link className={"navbar-brand backlink"} rel="prev" to={`${prefix}${link.href}`}>{link.title}</Link>
        }
      </Colorize>
    } else if (item?.prev || item?.next) {
      return <a className="navbar-brand" />
    } else {
      return null
    }
  }
}

class NextLink extends React.Component {
  render() {
    let { agenda, item, traversal } = this.props;

    let link = item?.next;
    if (link && !link.title) link = agenda[link];
    let prefix = '';
    let meetingDay = Minutes.started || Agenda.meeting_day;

    if (traversal === "queue") {
      while (link && !link.ready_for_review(User.initials)) {
        link = agenda[link.next]
      };

      link = link || { href: "queue", title: "Queue" }
    } else if (traversal === "shepherd") {
      while (link && link.shepherd !== item.shepherd) {
        link = agenda[link.next]
      };

      link = link || {
        href: `/shepherd/${item.shepherd}`,
        title: "/shepherd"
      }
    } else if (traversal === "flagged") {
      prefix = "/flagged";

      while (link && link.skippable) {
        if (meetingDay && !/^(\d+|[A-Z]+)$/m.test(link.attach)) {
          prefix = "";
          break
        } else {
          link = agenda[link.next]
        }
      };

      link = link || { href: "flagged", title: "Flagged" }
    } else if (meetingDay && link && /^\d[A-Z]/m.test(item.attach) && /^\d/m.test(link.attach)) {
      while (link && link.skippable && /^([A-Z]|\d+$)/m.test(link.attach)) {
        link = agenda[link.next]
      };

      prefix = "/flagged"
    };

    if (link) {
      if (!/^([A-Z]|\d+$)/m.test(link.attach)) prefix = "";

      return <Colorize item={link}>
        {(!prefix && link.href.startsWith('../'))
          ? <a className={"navbar-brand nextlink"} rel="next" href={link.href}>{link.title}</a>
          : <Link className={"navbar-brand nextlink"} rel="next" to={`${prefix}${link.href}`}>{link.title}</Link>
        }
      </Colorize>
    } else if (item?.prev || item?.next) {
      return <a className="navbar-brand" />
    } else {
      return null
    }
  }
}

export default connect(mapStateToProps)(Footer)