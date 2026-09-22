import argparse
import time
from datetime import datetime


def cli():
    parser = argparse.ArgumentParser(
        prog="alarm",
        description="alarm clock",
        epilog="eleven co.",
    )

    parser.add_argument("hour", help="hours")
    parser.add_argument("minutes", help="minutes")
    parser.add_argument("period", help="am/pm")

    args = parser.parse_args()

    print(args)

    current_time = datetime.now()
    alarm_time = datetime.strptime(
        f"{args.hour}:{args.minutes} {args.period}", "%I:%M %p"
    ).replace(year=current_time.year, month=current_time.month, day=current_time.day)

    # in seconds
    seconds = (alarm_time - current_time).total_seconds()

    print(seconds)

    time.sleep(seconds)

    print("ring ring")
