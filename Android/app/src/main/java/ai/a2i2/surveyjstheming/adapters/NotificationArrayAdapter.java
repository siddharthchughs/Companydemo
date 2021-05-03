package ai.a2i2.surveyjstheming.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.FragmentManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import ai.a2i2.surveyjstheming.NotificationDialogFragment;
import ai.a2i2.surveyjstheming.NotificationsListFragment;
import ai.a2i2.surveyjstheming.databinding.ListItemBinding;

public class NotificationArrayAdapter extends RecyclerView.Adapter<NotificationArrayAdapter.NotificationViewHolder> {

    private final NotificationsListFragment fragment;
    private final ArrayList<String> itemList;

    public NotificationArrayAdapter(@NonNull final NotificationsListFragment fragment, @NonNull final ArrayList<String> itemList) {
        this.fragment = fragment;
        this.itemList = itemList;
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    @NonNull
    @Override
    public NotificationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new NotificationViewHolder(ListItemBinding.inflate(LayoutInflater.from(parent.getContext())));
    }

    @Override
    public void onBindViewHolder(final NotificationViewHolder holder, final int listPosition) {
        holder.binding.rowItem.setText(itemList.get(listPosition));
    }

    class NotificationViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ListItemBinding binding;

        NotificationViewHolder(@NonNull ListItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            createSurveyDialog(fragment.getChildFragmentManager(), "Emails/" + binding.rowItem.getText());
        }

        private void createSurveyDialog(final FragmentManager fragmentManager, String path) {
            final NotificationDialogFragment dialog = NotificationDialogFragment.newInstance(path);
            if (dialog != null) {
                dialog.show(fragmentManager, dialog.getTag());
            }
        }
    }
}
