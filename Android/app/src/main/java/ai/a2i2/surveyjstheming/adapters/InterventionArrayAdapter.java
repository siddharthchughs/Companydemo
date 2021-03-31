package ai.a2i2.surveyjstheming.adapters;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

import ai.a2i2.surveyjstheming.InterventionActivity;
import ai.a2i2.surveyjstheming.InterventionListFragment;
import ai.a2i2.surveyjstheming.databinding.ListItemBinding;

public class InterventionArrayAdapter extends RecyclerView.Adapter<InterventionArrayAdapter.InterventionViewHolder> {

    private final InterventionListFragment fragment;
    private final ArrayList<String> itemList;

    public InterventionArrayAdapter(@NonNull final InterventionListFragment fragment, @NonNull final ArrayList<String> itemList) {
        this.fragment = fragment;
        this.itemList = itemList;
    }

    @Override
    public int getItemCount() {
        return itemList.size();
    }

    @NonNull
    @Override
    public InterventionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new InterventionViewHolder(ListItemBinding.inflate(LayoutInflater.from(parent.getContext())));
    }

    @Override
    public void onBindViewHolder(final InterventionViewHolder holder, final int listPosition) {
        holder.binding.rowItem.setText(itemList.get(listPosition));
    }

    class InterventionViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        ListItemBinding binding;

        public InterventionViewHolder(@NonNull ListItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            Intent intent = new Intent(view.getContext(), InterventionActivity.class);
            intent.putExtra("INTERVENTION", binding.rowItem.getText());
            fragment.startActivity(intent);
        }
    }
}
