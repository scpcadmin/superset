import logging
from superset.commands.report.execute import BaseReportState
from superset.reports.models import ReportSchedule
from superset.utils.pdf import build_pdf_from_screenshots

logger = logging.getLogger(__name__)

def export_dashboard(dashboard_id, data) -> bytes:
    report_state = BaseReportState(None, None, None)
    report_state._report_schedule = ReportSchedule
    report_state._report_schedule.dashboard.uuid = dashboard_id
    report_state._report_schedule.custom_width = 1600
    return report_state._get_pdf_dashboard(data)
